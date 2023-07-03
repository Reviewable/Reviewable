import { type DataSourceOptions } from 'typeorm';
const ormconfig : DataSourceOptions = {
  type: "postgres",
  host: "172.19.0.2",
  port: 5432,
  username: "postgres",
  password: "insecurepassword",
  database: "reviewable-analytics",
}
export default ormconfig;
