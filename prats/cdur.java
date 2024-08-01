import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class cdur extends Thread{
    protected Socket socket;
    protected List<String> Hosts = new ArrayList<String>();
    protected DataOutputStream dos;
    protected DataInputStream dis;

    public cdur (Socket socket, List<String> Hosts) {
        this.socket = socket;
        this.Hosts = Hosts;
    }

    public void run(){
        //code
        try {
            dos = new DataOutputStream(socket.getOutputStream());
            dis = new DataInputStream(socket.getInputStream());
            dos.writeUTF("ud");
            //accept the ip
            String hip = dis.readUTF();
            if (hip.equals("no")) return;
            Hosts.add(hip);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
