import {MigrationInterface, QueryRunner} from "typeorm";

export class orgLink1600820137930 implements MigrationInterface {
    name = 'orgLink1600820137930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `person` ADD `org_link` varchar(256) NOT NULL");
        await queryRunner.query("ALTER TABLE `technology` ADD `org_link` varchar(256) NOT NULL");
        await queryRunner.query("ALTER TABLE `project` ADD `org_link` varchar(256) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `org_link`");
        await queryRunner.query("ALTER TABLE `technology` DROP COLUMN `org_link`");
        await queryRunner.query("ALTER TABLE `person` DROP COLUMN `org_link`");
    }

}
