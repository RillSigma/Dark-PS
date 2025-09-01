import net from 'net';

export default async function handler(req, res) {
  const host = '103.42.116.171'; // Ganti dengan IP server game Anda
  const port = 80; // Ganti dengan port server game Anda

  const timeout = 5000; // Timeout dalam milidetik (5 detik)

  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = 'OFFLINE';

    socket.setTimeout(timeout);

    socket.on('connect', () => {
      status = 'ONLINE';
      socket.destroy();
    });

    socket.on('timeout', () => {
      socket.destroy();
    });

    socket.on('error', () => {
      socket.destroy();
    });

    socket.on('close', () => {
      res.status(200).json({ status });
      resolve();
    });

    socket.connect(port, host);
  });
                     }
