import boto3
import os
from datetime import datetime

AWS_REGION = "us-east-1"
BUCKET_NAME = "REEMPLAZA_CON_TU_BUCKET"
LOG_FILE = os.path.join("backend", "logs", "app.log")

def upload_log():
    if not os.path.exists(LOG_FILE):
        print("No existe el archivo de log.")
        return

    s3 = boto3.client("s3", region_name=AWS_REGION)
    filename = f"logs/app-{datetime.now().strftime('%Y%m%d-%H%M%S')}.log"

    s3.upload_file(LOG_FILE, BUCKET_NAME, filename)
    print(f"Log subido correctamente a s3://{BUCKET_NAME}/{filename}")

if __name__ == "__main__":
    upload_log()
