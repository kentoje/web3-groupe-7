import paho.mqtt.client as mqtt
import json, time, random
import os
from datetime import datetime
from time import sleep

GROUPNAME="WEB3-GROUPE7"

MQTT_BROKER = os.environ.get('INFLUX_BROKER')
MQTT_USERNAME = os.environ.get('INFLUX_USERNAME')
MQTT_PASSWORD = os.environ.get('INFLUX_PASSWORD')

nodes=["123", "456"]
SENSOR_ID=121

client = mqtt.Client("client")
client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
client.connect(MQTT_BROKER)

VALMIN = 0
VALMAX = 200000

def task():
    for node in nodes:
        MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID)
        MQTT_MSG = json.dumps({
            "source_address": node,
            "sensor_id": SENSOR_ID, "tx_time_ms_epoch": int(time.time()),
            "data": {"value": round(random.uniform(VALMIN, VALMAX), 2)}
        })
        print("MSG: {}".format(MQTT_MSG))
        foo = client.publish(MQTT_TOPIC, MQTT_MSG)
        print(foo)
        print(foo.rc)
        print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))

def run():
    counter = 0

    while True:
        counter += 1
        print("Counter: {}".format(counter))
        sleep(20)
        task()

run()
