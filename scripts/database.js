export function openDB() {
    return new Promise((resolve, reject) => {
        try {

            let request  = window.indexedDB.open("marketDB", 2);

            request.onerror = e => {
                console.log('Error opening db', e);
                reject('Error');
            };

            request.onsuccess = (e ) => {
                console.log("Success opening db",e)
                resolve(e.target.result);
            };

            request.onupgradeneeded = (event) => {
                console.log("Upgrading db",event)
                var db = event.target.result;

                // create objectstore for holding utxo content
                var objectStore = db.createObjectStore("utxoContent", { keyPath: "utxo" });

                // create utxo as the index.
                objectStore.createIndex("utxo", "utxo", { unique: true });

                // Use transaction oncomplete to make sure the objectStore creation is
                // finished before adding data into it.
                objectStore.transaction.oncomplete = event => {
                    Promise.resolve(db)
                }
            };
        } catch (e) {
            reject(e.message)
        }
    });
}
export function saveUtxos(db ,objects){
    if(!db){
        return Promise.reject("Null db instance")
    }
    return new Promise((resolve, reject) => {
        console.log("Starting to save")
        let trans = db.transaction('utxoContent', 'readwrite');
        trans.oncomplete = () => {
            resolve(objects);
        };
        trans.onerror=(e)=>{
            console.log("Saving error",e)
            reject("Error")
        }

        let store = trans.objectStore('utxoContent');
        objects.forEach(x =>{
            console.log("putting",x)
            store.put(x);
        })
        trans.commit()
    })
}
export function getReadHandle(db){
    const trans=db.transaction('utxoContent');
    return trans.objectStore('utxoContent')

}
export function getUtxo(handle,id) {
    if(!handle){
        return Promise.reject(" Null Object store handle")
    }
    return new Promise((resolve, reject) => {

        var request = handle.get(id);
        request.onerror = event => {
            reject(event)
        };
        request.onsuccess = event => {
            // Do something with the request.result!
            console.log("returning from db",request.result)
            if(request.result)
                resolve(request.result)
            else
                reject("Not found")
        }
    })
}
