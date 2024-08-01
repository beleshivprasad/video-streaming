/*
todo:
    1. Use discover file and request chunks as two different methods
 */

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;

import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Client1 {
    public static List<String> connectedHosts = new ArrayList<String>();
    protected DataOutputStream dos;

    public static void main (String[] args) throws Exception {

        Scanner scanner = new Scanner(System.in);
        Socket socket;

        System.out.println("1. Receive File(discover)\n2.Don't know yet\n" +
                "3.Cdur?\n*.Exit\nEnter: ");
        String ch = scanner.next();

        switch (ch){
            case "discover": //discover file
                System.out.println("Enter file name to find: ");
                String name = scanner.next(); //file name to discover
                List<String> found = new ArrayList<String>();
                ExecutorService es = Executors.newCachedThreadPool();

                es.execute(new udpClient(name, found));
                //call udpClient for server discovery before the following code
//                connectedHosts.add("127.0.0.1");
                int i = 0;
                while (found.isEmpty()) {
                    if (i++%10000000 == 0) System.out.println("size is: " + found.size());
                }
//                for (String host: connectedHosts){
                for (String host: found){
                        socket = new Socket(host, 3000);
                        System.out.println("Receiving File...");
                        es.execute(new ReceiveFile(socket, name));
                }
                es.shutdown();
                boolean finished = es.awaitTermination(1, TimeUnit.MINUTES);
                System.out.println("Is Finished: "+finished+"\nFound: "+
                        found.size()+" hosts.");
                break;
            case "s":
                break;
            case "ur":
                //call udpClient for server discovery before the following code
                List<String> upHost = new ArrayList<String>();
                for (String host: connectedHosts) {
                    socket = new Socket(host, 3000);
                    new cdur(socket, upHost).start();
                }
                break;
        }

        System.out.println("File Saved Successfully!");
    }
}
