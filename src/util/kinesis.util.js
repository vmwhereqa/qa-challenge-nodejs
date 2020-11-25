const AWS = require('aws-sdk');

const kinesis = new AWS.Kinesis({
  endpoint: process.env.AWS_ENDPOINT,
  region: 'eu-central-1',
});

export default async (streamName) => {
  const result = await new Promise((resolve, reject) => {
    kinesis.listShards({ StreamName: streamName }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

  const shardIterator = await new Promise((resolve, reject) => {
    kinesis.getShardIterator(
      {
        ShardId: result.Shards[0].ShardId,
        ShardIteratorType: 'TRIM_HORIZON',
        StreamName: streamName,
      },
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      },
    );
  });

  const data = await new Promise((resolve, reject) => {
    kinesis.getRecords(
      { ShardIterator: shardIterator.ShardIterator },
      // eslint-disable-next-line no-shadow
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      },
    );
  });
  return data.Records.map((records) => JSON.parse(records.Data.toString('utf8')));
};
