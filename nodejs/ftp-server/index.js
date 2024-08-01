const fs = require('fs');
const net = require('net');

const PORT = 3021; // FTP server port
const ROOT_DIRECTORY = '/home'; // Root directory for the FTP server

const commands = {
  LIST: 'LIST',
  RETR: 'RETR',
  STOR: 'STOR',
  QUIT: 'QUIT'
};

function createFTPResponse(code, message) {
  return `${code} ${message}\r\n`;
}

function parseCommand(command) {
  return command.trim().toUpperCase();
}

function handleCommand(command, dataSocket, socket) {
  const parsedCommand = parseCommand(command);

  switch (parsedCommand) {
    case commands.LIST:
      fs.readdir(ROOT_DIRECTORY, (err, files) => {
        if (err) {
          socket.write(createFTPResponse(550, 'Failed to list directory'));
        } else {
          const fileList = files.join('\r\n');
          socket.write(createFTPResponse(150, 'Opening ASCII mode data connection'));
          socket.write(fileList);
          socket.write('\r\n');
          socket.write(createFTPResponse(226, 'Directory send OK'));
        }
        dataSocket.end();
      });
      break;

    case commands.RETR:
      const fileName = command.split(' ')[1];
      const filePath = `${ROOT_DIRECTORY}/${fileName}`;

      fs.readFile(filePath, (err, data) => {
        if (err) {
          socket.write(createFTPResponse(550, 'Failed to retrieve file'));
        } else {
          socket.write(createFTPResponse(150, 'Opening BINARY mode data connection'));
          socket.write(data);
          socket.write(createFTPResponse(226, 'Transfer complete'));
        }
        dataSocket.end();
      });
      break;

    case commands.STOR:
      const storedFileName = command.split(' ')[1];
      const storedFilePath = `${ROOT_DIRECTORY}/${storedFileName}`;

      dataSocket.on('data', data => {
        fs.appendFile(storedFilePath, data, err => {
          if (err) {
            socket.write(createFTPResponse(550, 'Failed to store file'));
          }
        });
      });

      dataSocket.on('end', () => {
        socket.write(createFTPResponse(226, 'Transfer complete'));
        socket.end();
      });

      dataSocket.on('error', err => {
        socket.write(createFTPResponse(550, 'Failed to store file'));
        socket.end();
      });

      socket.write(createFTPResponse(150, 'Opening BINARY mode data connection'));
      break;

    case commands.QUIT:
      socket.write(createFTPResponse(221, 'Goodbye'));
      socket.end();
      break;

    default:
      // Unsupported command
      socket.write(createFTPResponse(502, 'Command not implemented'));
      socket.end();
      break;
  }
}

function createDataServer(callback) {
  const dataServer = net.createServer(callback);
  dataServer.listen(0, 'localhost', () => {
    const { port } = dataServer.address();
    callback(port);
  });
}

const server = net.createServer(socket => {
  socket.write(createFTPResponse(220, 'Welcome to the FTP server'));

  const dataServer = createDataServer(dataPort => {
    socket.write(
      createFTPResponse(
        227,
        `Entering Passive Mode (127,0,0,1,${Math.floor(dataPort / 256)},${dataPort % 256})`
      )
    );
  });

  socket.on('data', data => {
    const command = data.toString().trim();

    if (command) {
      handleCommand(command, dataServer, socket);
    }
  });

  socket.on('end', () => {
    dataServer.close();
  });

  socket.on('error', err => {
    console.log('Error Occured: ', err?.message);
    socket.end();
  });
});

server.listen(PORT, () => {
  console.log(`FTP server listening on port ${PORT}`);
});
