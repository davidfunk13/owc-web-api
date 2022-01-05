import { getConnection, MigrationInterface, QueryRunner } from "typeorm";
import heroList from "../utils/heroList";

export class Seed1641387626480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const connection = await getConnection()
        console.log({connection})
        // heroList.map(async (hero) => {

        // })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
