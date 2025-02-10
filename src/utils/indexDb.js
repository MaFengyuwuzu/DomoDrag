export default {
  // indexedDB兼容
  indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB,
  /**
   * 打开数据库
   * 新对象储存空间newStore参数：newStore.name、newStore.key
   * 新增对象存储空间要更改数据库版本
   * @param {数据库名称} dbname 
   * @param {版本} version 
   * @param {数据库} db 
   * @param {配置} newStore 
   * @param {回调函数} callback 
   */
  openDB(dbname, version, newStore, callback) {
    let db
    version = version || 1;
    const request = this.indexedDB.open(dbname, version);
    request.onerror = function () {
      console.log('IndexedDB数据库打开错误');
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      if (callback && (typeof callback === 'function')) {
        callback(db);
      }
    };
    // onupgradeneeded，调用创建新的储存空间
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (newStore) {
        if (!db.objectStoreNames.contains(newStore.name)) {
          const objectStore = db.createObjectStore(newStore.name, {
            autoIncrement: true
          });
          // newStore.index.forEach(item => {
          objectStore.createIndex(newStore.index, newStore.index, {
            unique: true
          });
        }
      }
    };
  },
  /**
   * 删除数据库
   * @param {*} dbname 
   * @param {*} callback 
   */
  deleteDb(dbname, callback) {
    const deleteQuest = this.indexedDB.deleteDatabase(dbname);
    deleteQuest.onerror = function () {
      console.log('删除数据库出错');
    };
    deleteQuest.onsuccess = function () {
      if (callback && (typeof callback === 'function')) {
        callback();
      }
    }
  },
  /**
   * 关闭数据库
   * @param {*} dbname 
   */
  closeDB(dbname) {
    dbname.close();
    console.log('数据库已关闭');
  },
  /**
   * 删除数据
   * @param {*} db 
   * @param {*} storename 
   * @param {*} key 
   * @param {*} callback 
   */
  deleteData(db, storename, key, callback) {
    const store = db.transaction(storename, 'readwrite').objectStore(storename);
    const request = store.delete(key);
    request.onsuccess = function () {
      if (callback && (typeof callback === 'function')) {
        callback('删除成功');
      }
    }
    request.onerror = function () {
      if (callback && (typeof callback === 'function')) {
        callback('删除失败');
      }
    }

  },
  /**
   * 清空数据
   * @param {*} db 
   * @param {*} storename 
   * @param {*} callback 
   */
  clearData(db, storename, callback) {
    const store = db.transaction(storename, 'readwrite').objectStore(storename);
    const request = store.clear();
    request.onsuccess = function () {
      if (callback && (typeof callback === 'function')) {
        callback('清空数据成功');
      }
    }
    request.onerror = function () {
      if (callback && (typeof callback === 'function')) {
        callback('清空数据失败');
      }
    }
  },
  /**
   * 添加数据
   * @param {*} db 
   * @param {*} storename 
   * @param {*} obj 
   */
  addData(db, storename, list) {
    const store = db.transaction(storename, 'readwrite').objectStore(storename);
    list.forEach(ls => {
      const request = store.add(ls);
      request.onsuccess = function () {
      };
      request.onerror = function () {
        console.log('数据写入失败');
      }
    })
  },
  /**
   * 更新数据
   * @param {*} db 
   * @param {*} storename 
   * @param {*} obj 
   */
  updateData(db, storename, list) {
    const store = db.transaction(storename, 'readwrite').objectStore(storename);
    list.forEach(ls => {
      const request = store.put(ls);
      request.onsuccess = function () {
        console.log('数据更新成功');
      };
      request.onerror = function () {
        console.log('数据更新失败');
      }
    })
  },
  /**
   * 根据主键获取数据
   * @param {*} db 
   * @param {*} storeName 
   * @param {*} key 
   * @returns 
   */
  getData(db, storeName, key) {
    var objectStore = db.transaction(storeName).objectStore(storeName);
    var request = objectStore.get(key);
    request.onerror = function (event) {
      console.log('事务失败');
    };
    return new Promise((resolve, reject) => {
      request.onsuccess = function (e) {
        resolve(e.target.result)
      }
    })
  },
  /**
   * 根据索引获取数据
   * @param {*} db 
   * @param {*} storeName 
   * @param {*} field 
   * @param {*} val 
   */
  getDataByIndex(db, storeName, field, val) {
    const objectStore = db.transaction(storeName).objectStore(storeName);
    const index = objectStore.index(field + '_index');
    const request = index.get(val);
    return new Promise((resolve, reject) => {
      request.onsuccess = function (e) {
        resolve(e.target.result)
      }
    })
  },
  /**
   * 获取全部数据
   * @param {*} db 
   * @param {*} storeName 
   * @returns 
   */
  getAllData(db, storeName) {
    const objectStore = db.transaction(storeName).objectStore(storeName);
    const request = objectStore.openCursor();

    let data = [];
    return new Promise((resolve, reject) => {
      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          resolve(data)
        }
      }
    })
  },
  /**
   * 遍历全部数据，判断数据是否已存在于数据库
   * @param {*} allDbData
   * @param {*} list
   * @returns 
   */
  readAllData(allDbData, list) {
    let flagIndex
    allDbData.then(res => {
      flagIndex = res.findIndex(val => {
        return (val.id == list[0].id)
      })
    })
    return flagIndex
  },

  // 获取所有key
  getAllDatakey(db, storeName) {
    const objectStore = db.transaction(storeName).objectStore(storeName);
    const request = objectStore.getAllKeys();
    let data = [];
    return new Promise((resolve, reject) => {
      request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          data.push(cursor);
          resolve(data)
        } else {
          resolve(data)
        }
      }
    })
  },
}
