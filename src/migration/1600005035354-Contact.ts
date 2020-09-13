import {MigrationInterface, QueryRunner} from "typeorm";

export class Contact1600005035354 implements MigrationInterface {
    name = 'Contact1600005035354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` DROP FOREIGN KEY `FK_a355360156dc34d5afff56aa47e`");
        await queryRunner.query("ALTER TABLE `contact` CHANGE `personId` `creatbyId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_83b775da14886d352de2a4cac01`");
        await queryRunner.query("ALTER TABLE `person` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contact` ADD CONSTRAINT `FK_a546f271e91e2e380562f85defe` FOREIGN KEY (`creatbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` DROP FOREIGN KEY `FK_a546f271e91e2e380562f85defe`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_83b775da14886d352de2a4cac01`");
        await queryRunner.query("ALTER TABLE `person` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`, `userId`) REFERENCES `user`(`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contact` CHANGE `creatbyId` `personId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `contact` ADD CONSTRAINT `FK_a355360156dc34d5afff56aa47e` FOREIGN KEY (`personId`, `personId`) REFERENCES `person`(`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
