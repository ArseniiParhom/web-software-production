import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Point every test at the TEST database, never the dev one.
		env: {
			PGHOST: "localhost",
			PGPORT: "5432",
			PGUSER: "app",
			PGPASSWORD: "app_pw",
			PGDATABASE: "app_test_db",
		},

		// Test files share the same database, so run them sequentially.
		fileParallelism: false,
	},
});
