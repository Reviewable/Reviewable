import { type DataSourceOptions } from 'typeorm';
const ormconfig : DataSourceOptions = {
  type: "postgres",
  host: "reviewable-analytics-postgres",
  port: 5432,
  username: "postgres",
  password: "insecurepassword",
  database: "reviewable-analytics",
}
export default ormconfig;
