import { CONFIG_DATABASE } from 'src/common/constants';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from "dotenv"
config({ path: `.env.${process.env.NODE_ENV}` })

export const AppDataSource = new DataSource(CONFIG_DATABASE<DataSourceOptions>());
