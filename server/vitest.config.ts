import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Point every test at the TEST database, never the dev one.
		env: {
			PGHOST: process.env.PGHOST ?? "localhost",
			PGPORT: process.env.PGPORT ?? "5432",
			PGUSER: process.env.PGUSER ?? "app",
			PGPASSWORD: process.env.PGPASSWORD ?? "app_pw",
			PGDATABASE: process.env.PGDATABASE ?? "app_test_db",
		},

		// Test files share the same database, so run them sequentially.
		fileParallelism: false,
	},
});
