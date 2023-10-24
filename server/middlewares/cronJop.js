import { schedule } from 'node-cron';
import { readdir, unlink } from 'fs';
import path, { join } from 'path';

const __dirname = path.resolve();
const folderPath = join(__dirname, 'uploads', 'Downloads');

const cronJob = () => {
  schedule('0 0 * * *', () => {
    // Delete all files in the folder
    readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
      } else {
        files.forEach((file) => {
          const filePath = join(folderPath, file);
          unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}:`, err);
            } else {
              console.log(`Deleted file: ${file}`);
            }
          });
        });
      }
    });
  });
};

export default cronJob;
