import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketTimeoutException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class udpClient extends Thread {

    //static Client client;

    //public static void main(String[] args) throws Exception {
    protected String fileName;
    List<String> found;

    public udpClient(String fileName, List<String> found) {
        this.fileName = fileName;
        this.found = found;
    }
//    public static void main(String[] args) throws Exception {
    public void run() {
        try {
            DatagramSocket ds = new DatagramSocket();
            ds.setBroadcast(true);

            //byte[] b = "this is udp client".getBytes(StandardCharsets.UTF_8);
            byte[] b = "00".getBytes(StandardCharsets.UTF_8);

            InetAddress ip = InetAddress.getByName("255.255.255.255");
            int port = 2000;

            //data, size of data, ip, port
            DatagramPacket dp = new DatagramPacket(b, b.length, ip, port);

            ds.send(dp);
            while (true) {
                byte[] rs = new byte[100];
                DatagramPacket rPacket = new DatagramPacket(rs, rs.length);
                try {
                    ds.setSoTimeout(1000);
                    ds.receive(rPacket);

                    System.out.println(">>>Received response from " + rPacket.getAddress().getHostAddress());

                    String msg = new String(rs);
                    System.out.println("Message is" + msg);
                    if (msg.trim().equals("11")) {
                        //store
                        System.out.println("Adding ip to CH");
                        //client.addHost(rPacket.getAddress().getHostAddress());
//                    Client.connectedHosts.add(rPacket.getAddress().getHostAddress());
                        found.add(rPacket.getAddress().getHostAddress());
                        System.out.println(found.size());
                        for (String p : found) {
                            System.out.println("Nodes: " + p);
                        }
                    } else break;
                } catch (SocketTimeoutException t) {
                    System.out.println("Timeout");
                    break;
                }

            }
            ds.close();
        } catch (Exception e) {
            System.out.println("Failed in UDP client");
        }
    }
}

/*
public class BroadcastingClient {
    private static DatagramSocket socket = null;

    public static void main(String[] args) throws IOException {
        broadcast("Hello", InetAddress.getByName("255.255.255.255"));
    }

    public static void broadcast (String broadcastMessage, InetAddress address) throws IOException {
        socket = new DatagramSocket();
        socket.setBroadcast(true);

        byte[] buffer = broadcastMessage.getBytes(StandardCharsets.UTF_8);

        DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, 2000);
        socket.send(packet);
        socket.close();
    }
}
 */