import nakamaUtil from '@cardinal-entertainment/nakama-util/dist/nakama';

const nakamaInstance = nakamaUtil.getInstance(
  process.env.REACT_APP_LOCAL === 'true',
  process.env.REACT_APP_NAKAMA_SERVER_KEY
);

export default nakamaInstance;
