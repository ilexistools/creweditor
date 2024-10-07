import { Injectable } from '@angular/core';
import { createRxDatabase, RxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxJsonSchema } from 'rxdb';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Defina uma interface para a estrutura dos seus documentos
interface Hero {
  id: string;
  name: string;
  color?: string; // Propriedade opcional
  // Adicione mais campos conforme necessário
}

// Atualize a definição do esquema para usar a interface Hero como argumento de tipo
const heroSchema: RxJsonSchema<Hero> = {
  title: 'hero schema',
  description: 'describes a simple hero',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100, // <- the primary key must have set maxLength
    },
    name: {
      type: 'string'
    },
    color: {
      type: 'string'
    }
    // Adicione mais propriedades conforme necessário
  },
  required: ['id', 'name']
};


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {
  db: RxDatabase | undefined;

  constructor(private http: HttpClient) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    this.db = await this.createDatabase();
    this.loadData();
  }

  loadData() {
    this.http.get<Hero[]>('assets/data.json').subscribe(async data => {
      if (this.db) {
        await this.insertData(this.db, data);
        console.log("Dados inseridos com sucesso!");
      }
    }, error => {
      console.error("Erro ao carregar dados JSON:", error);
    });
  }

  async createDatabase() {
    const db = await createRxDatabase({
      name: 'heroesdb',
      storage: getRxStorageDexie()
    });

    console.log("Database created: ", db);

    await db.addCollections({
      heroes: {
        schema: heroSchema
      }
    });

    return db; // Retorna a instância do banco de dados
  }

  async insertData(db: RxDatabase, data: Hero[]) {
    await db['heroes'].bulkInsert(data);
  }

  async findHeroesByName(name: string) {
    if (!this.db) {
      console.error("Database not initialized");
      return;
    }
    const results = await this.db['heroes']
      .find({
        selector: { name: { $eq: name } }
      })
      .exec();
      console.log(results);
    return results;
  }
  


}
