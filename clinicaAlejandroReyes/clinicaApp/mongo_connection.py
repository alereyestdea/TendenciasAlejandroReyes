import pymongo


def get_mongo_connection():
    # Configura la URL de conexión de MongoDB sin autenticación.
    mongo_url = "mongodb://localhost:27017/ClinicaAppHC"

    # Intenta establecer una conexión a la base de datos MongoDB.
    try:
        client = pymongo.MongoClient(mongo_url)
        db = client.ClinicaAppHC  # Reemplaza "my_database" con el nombre de tu base de datos.
        return db
    except pymongo.errors.ConnectionFailure as e:
        print("Error de conexión a MongoDB:", str(e))
        return None

export = get_mongo_connection()
# Puedes usar esta función para obtener la conexión en otros archivos de tu proyecto Django.
