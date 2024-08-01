import java.io.*;
import java.net.Socket;

public class ReceiveFile extends Thread {
    protected Socket socket;
    //protected String IP;
    protected DataInputStream dis;
    protected DataOutputStream dos;
    protected String fileName;

    public ReceiveFile(Socket socket, String fileName){
        this.socket = socket;
        //this.IP = IP;
        this.fileName = fileName;
    }

    private void Receive(){
        File file = new File("Copy of "+fileName+".txt");
        System.out.println(file.getAbsolutePath());
        FileOutputStream fos;
        BufferedOutputStream bos;
        InputStream is;

        try{
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            is = socket.getInputStream();
        }
        catch (Exception e){
            e.printStackTrace();
            return;
        }

        byte[] contents;
        long fileLength = -1;
        try {
            fileLength = Long.parseLong(dis.readUTF());
        } catch (IOException e) {
            e.printStackTrace();
        }
        long current = 0;

        while (current!=fileLength) {
            int size = 10000;
            if (fileLength - current >= size) current+=size;
            else{
                size = (int) (fileLength - current);
                current = fileLength;
            }
            contents = new byte[size];
            try {
                is.read(contents);
                bos.write(contents, 0, size);
                bos.flush();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                try {
                    bos.close();
                    fos.close();
                } catch (Exception e) {
                    System.out.println("Failed to close buffer");
                }
            }
            System.out.println("Receiving file " + (current*100)/fileLength + "% completed");
        }
    }

    public void run(){
        //code
        try {
            System.out.println("All right, I'm working");
            dis = new DataInputStream(socket.getInputStream());
            dos = new DataOutputStream(socket.getOutputStream());
            dos.writeUTF("u");
            dos.writeUTF(fileName);
            System.out.println("Calling Function");
            Receive();
            socket.close();
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
}
