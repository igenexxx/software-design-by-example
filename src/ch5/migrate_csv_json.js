import {convertCSVtoJSON} from "./migration.js";

const [csv, json] = process.argv.slice(2);

if (!csv || !json) {
  console.error('Usage: node migrate_csv_json.js <csv> <json>');
  process.exit(1);
}

await convertCSVtoJSON(csv, json);
