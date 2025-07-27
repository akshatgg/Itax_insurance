// IndexedDB utility for storing insurance data
interface InsuranceData {
  id: string
  type: "quote" | "policy" | "claim" | "medical-record"
  data: any
  timestamp: number
}

class InsuranceDB {
  private dbName = "InsuranceApp"
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("quotes")) {
          db.createObjectStore("quotes", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("policies")) {
          const policyStore = db.createObjectStore("policies", { keyPath: "id" })
          policyStore.createIndex("policyNumber", "policyNumber", { unique: false })
          policyStore.createIndex("panNumber", "panNumber", { unique: false })
        }
        if (!db.objectStoreNames.contains("claims")) {
          const claimStore = db.createObjectStore("claims", { keyPath: "id" })
          claimStore.createIndex("claimId", "claimId", { unique: false })
          claimStore.createIndex("policyNumber", "policyNumber", { unique: false })
        }
        if (!db.objectStoreNames.contains("medical-records")) {
          db.createObjectStore("medical-records", { keyPath: "id" })
        }
      }
    })
  }

  async saveData(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.put({
        id: data.id || Date.now().toString(),
        ...data,
        timestamp: Date.now(),
      })

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getData(storeName: string, id: string): Promise<any> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async getAllData(storeName: string): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async searchByIndex(storeName: string, indexName: string, value: string): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(value)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async deleteData(storeName: string, id: string): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  // Specific methods for insurance data
  async saveQuote(quoteData: any): Promise<void> {
    return this.saveData("quotes", quoteData)
  }

  async savePolicy(policyData: any): Promise<void> {
    return this.saveData("policies", policyData)
  }

  async saveClaim(claimData: any): Promise<void> {
    return this.saveData("claims", claimData)
  }

  async saveMedicalRecord(recordData: any): Promise<void> {
    return this.saveData("medical-records", recordData)
  }

  async searchClaim(claimId: string): Promise<any[]> {
    return this.searchByIndex("claims", "claimId", claimId)
  }

  async searchPolicy(policyNumber: string): Promise<any[]> {
    return this.searchByIndex("policies", "policyNumber", policyNumber)
  }

  async searchByPAN(panNumber: string): Promise<any[]> {
    return this.searchByIndex("policies", "panNumber", panNumber)
  }
}

export const insuranceDB = new InsuranceDB()
