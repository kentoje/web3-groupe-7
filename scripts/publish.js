#!/usr/bin/env node

const mqtt = require('mqtt');

const client = mqtt.connect(`mqtt://${process.env.INFLUX_BROKER}`, {
  username: process.env.INFLUX_USERNAME,
  password: process.env.INFLUX_PASSWORD,
});

const sensors = [
  { id: '119', interval: { min: 0, max: 1 }, round: true },
  { id: '121', interval: { min: 0, max: 200000 }, round: false },
  { id: '129', interval: { min: 0, max: 1 }, round: true },
];

const nodes = [
  {
    id: '4863786',
    sensors: ['119', '121', '129'],
  },
  {
    id: '4574379',
    sensors: ['121'],
  },
  {
    id: '3445757',
    sensors: ['121'],
  },
  {
    id: '5579889',
    sensors: ['121'],
  },
  {
    id: '7684464',
    sensors: ['119', '121', '129'],
  },
  {
    id: '8364979',
    sensors: ['119', '121', '129'],
  },
  {
    id: '8233019',
    sensors: ['121'],
  },
  {
    id: '6667997',
    sensors: ['121'],
  },
  {
    id: '9889745',
    sensors: ['121'],
  },
  {
    id: '4687874',
    sensors: ['119', '121', '129'],
  },
  {
    id: '7446379',
    sensors: ['121'],
  },
  {
    id: '6358338',
    sensors: ['119', '121', '129'],
  },
  {
    id: '7638989',
    sensors: ['121'],
  },
];

const pickSensor = (id) => sensors.find((sensor) => sensor.id === id);

const secondInMilliseconds = (second) => second * 1000;
const randomIntFromInterval = (min, max) => Math.random() * (max - min) + min;
const roundRandomInt = (min, max) => Math.round(randomIntFromInterval(min, max));
const fixRandomInt = (fixInt) => (min, max) => (
  Number(randomIntFromInterval(min, max).toFixed(fixInt))
);
const fixedByTwo = fixRandomInt(2);

const GROUPNAME = 'WEB3-GROUPE7';

const publishData = () => {
  const publishableData = nodes.flatMap((node) => node.sensors.map((sensor) => {
    const actualSensor = pickSensor(sensor);
    const mqttTopic = `${GROUPNAME}/${node.id}/${sensor}`;
    const objMessage = {
      source_address: node.id,
      sensor_id: sensor,
      tx_time_ms_epoch: new Date().getTime(),
      data: {
        value: actualSensor.round
          ? roundRandomInt(actualSensor.interval.min, actualSensor.interval.max)
          : fixedByTwo(actualSensor.interval.min, actualSensor.interval.max),
      },
    };

    return {
      topic: mqttTopic,
      message: JSON.stringify(objMessage),
    };
  }));

  publishableData.forEach(({ topic, message }) => {
    console.log(`Published: ${topic} -> ${message} at ${new Date()}`);
    client.publish(topic, message);
  });
};

const run = (time = secondInMilliseconds(10)) => {
  setInterval(() => {
    publishData();
  }, time);
};

run(secondInMilliseconds(10));
