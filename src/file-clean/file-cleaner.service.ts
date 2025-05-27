// import { Injectable } from "@nestjs/common";
// import { Cron } from "@nestjs/schedule";
// import * as fs from "fs";
// import * as path from "path";

// @Injectable()
// export class FileCleanerService {
//   private readonly uploadPath = path.resolve(process.cwd(), "uploads");

//   @Cron("0 * * * * *") // каждую минуту
//   handleCron() {
//     console.log("🧹 Очистка папки uploads запущена...");
//     this.cleanDirectory(this.uploadPath);
//     console.log("✅ Очистка завершена");
//   }

//   private cleanDirectory(directoryPath: string) {
//     if (!fs.existsSync(directoryPath)) return;

//     const items = fs.readdirSync(directoryPath);

//     for (const item of items) {
//       const itemPath = path.join(directoryPath, item);

//       try {
//         const stat = fs.statSync(itemPath);

//         if (stat.isDirectory()) {
//           // Рекурсивно заходи в подпапки
//           this.cleanDirectory(itemPath);
//         } else {
//           const isOld = true; // можно сделать по дате, если нужно
//           if (isOld) {
//             fs.unlinkSync(itemPath);
//             console.log("✅ Удалён файл:", itemPath);
//           }
//         }
//       } catch (e) {
//         console.error("❌ Ошибка при удалении:", itemPath, e.message);
//       }
//     }
//   }
// }
