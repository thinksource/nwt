import {MigrationInterface, QueryRunner} from "typeorm";

export class projectchange1599715390746 implements MigrationInterface {
    name = 'projectchange1599715390746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_5af76634d4e509c9dd25662eb0c`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_dcdfc66f6bb52b23237f7d28bbf`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_2cc174c7fcb7713745dbda578d6`");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `organizationId` `organizationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `creatbyId` `creatbyId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `contactId` `contactId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_d5521fc5e96a00879eb3d137b9e`");
        await queryRunner.query("ALTER TABLE `organization` CHANGE `createbyId` `createbyId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_b18f6960a7b74319aba20ae140a`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_0028dfadf312a1d7f51656c4a9a`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_4bbeed7e2acd7129754843afaac`");
        await queryRunner.query("ALTER TABLE `project` CHANGE `contactId` `contactId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `project` CHANGE `organizationId` `organizationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `project` CHANGE `creatbyId` `creatbyId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_83b775da14886d352de2a4cac01`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_affb4875fc39715b67d0e5bc82f`");
        await queryRunner.query("ALTER TABLE `person` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `person` CHANGE `belongOrganizationId` `belongOrganizationId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `contact` DROP FOREIGN KEY `FK_a355360156dc34d5afff56aa47e`");
        await queryRunner.query("ALTER TABLE `contact` CHANGE `personId` `personId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_5af76634d4e509c9dd25662eb0c` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_dcdfc66f6bb52b23237f7d28bbf` FOREIGN KEY (`creatbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_2cc174c7fcb7713745dbda578d6` FOREIGN KEY (`contactId`) REFERENCES `contact`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_d5521fc5e96a00879eb3d137b9e` FOREIGN KEY (`createbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_b18f6960a7b74319aba20ae140a` FOREIGN KEY (`contactId`) REFERENCES `contact`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_0028dfadf312a1d7f51656c4a9a` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_4bbeed7e2acd7129754843afaac` FOREIGN KEY (`creatbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_affb4875fc39715b67d0e5bc82f` FOREIGN KEY (`belongOrganizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contact` ADD CONSTRAINT `FK_a355360156dc34d5afff56aa47e` FOREIGN KEY (`personId`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` DROP FOREIGN KEY `FK_a355360156dc34d5afff56aa47e`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_affb4875fc39715b67d0e5bc82f`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_83b775da14886d352de2a4cac01`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_4bbeed7e2acd7129754843afaac`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_0028dfadf312a1d7f51656c4a9a`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_b18f6960a7b74319aba20ae140a`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_d5521fc5e96a00879eb3d137b9e`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_2cc174c7fcb7713745dbda578d6`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_dcdfc66f6bb52b23237f7d28bbf`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_5af76634d4e509c9dd25662eb0c`");
        await queryRunner.query("ALTER TABLE `contact` CHANGE `personId` `personId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `contact` ADD CONSTRAINT `FK_a355360156dc34d5afff56aa47e` FOREIGN KEY (`personId`, `personId`, `personId`) REFERENCES `person`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` CHANGE `belongOrganizationId` `belongOrganizationId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `person` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_affb4875fc39715b67d0e5bc82f` FOREIGN KEY (`belongOrganizationId`, `belongOrganizationId`, `belongOrganizationId`) REFERENCES `organization`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`, `userId`, `userId`) REFERENCES `user`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` CHANGE `creatbyId` `creatbyId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `project` CHANGE `organizationId` `organizationId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `project` CHANGE `contactId` `contactId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_4bbeed7e2acd7129754843afaac` FOREIGN KEY (`creatbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_0028dfadf312a1d7f51656c4a9a` FOREIGN KEY (`organizationId`, `organizationId`, `organizationId`) REFERENCES `organization`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_b18f6960a7b74319aba20ae140a` FOREIGN KEY (`contactId`, `contactId`, `contactId`) REFERENCES `contact`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organization` CHANGE `createbyId` `createbyId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_d5521fc5e96a00879eb3d137b9e` FOREIGN KEY (`createbyId`, `createbyId`, `createbyId`) REFERENCES `user`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `contactId` `contactId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `creatbyId` `creatbyId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `technology` CHANGE `organizationId` `organizationId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_2cc174c7fcb7713745dbda578d6` FOREIGN KEY (`contactId`, `contactId`, `contactId`) REFERENCES `contact`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_dcdfc66f6bb52b23237f7d28bbf` FOREIGN KEY (`creatbyId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_5af76634d4e509c9dd25662eb0c` FOREIGN KEY (`organizationId`, `organizationId`, `organizationId`) REFERENCES `organization`(`id`,`id`,`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `name`");
    }

}