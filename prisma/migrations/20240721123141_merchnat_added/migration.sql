-- AlterTable
ALTER TABLE `Product` ADD COLUMN `merchantId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_merchantId_fkey` FOREIGN KEY (`merchantId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
