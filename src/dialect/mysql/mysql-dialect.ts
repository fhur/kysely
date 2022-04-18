import { Driver } from '../../driver/driver.js'
import { Kysely } from '../../kysely.js'
import { QueryCompiler } from '../../query-compiler/query-compiler.js'
import { Dialect } from '../dialect.js'
import { DatabaseIntrospector } from '../database-introspector.js'
import { MysqlDriver, MysqlPool } from './mysql-driver.js'
import { MysqlQueryCompiler } from './mysql-query-compiler.js'
import { MysqlIntrospector } from './mysql-introspector.js'
import { DialectAdapter } from '../dialect-adapter.js'
import { MysqlAdapter } from './mysql-adapter.js'
import { MysqlDialectConfig } from './mysql-dialect-config.js'

/**
 * MySQL dialect that uses the [mysql2](https://github.com/sidorares/node-mysql2#readme) library.
 *
 * The {@link MysqlDialectConfig | configuration} passed to the constructor
 * is given as-is to the mysql2 library's [createPool](https://github.com/sidorares/node-mysql2#using-connection-pools)
 * method.
 *
 * You can also provide an existing mysql2 `Pool` instance:
 *
 * ```ts
 * import { createPool } from 'mysql2'
 * new MysqlDialect(createPool(config))
 * ```
 */
export class MysqlDialect implements Dialect {
  readonly #configOrPool: MysqlDialectConfig | MysqlPool

  constructor(configOrPool: MysqlDialectConfig | MysqlPool) {
    this.#configOrPool = configOrPool
  }

  createDriver(): Driver {
    return new MysqlDriver(this.#configOrPool)
  }

  createQueryCompiler(): QueryCompiler {
    return new MysqlQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new MysqlAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new MysqlIntrospector(db)
  }
}
