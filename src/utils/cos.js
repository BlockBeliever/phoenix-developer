import COS from 'cos-js-sdk-v5';
import { getTencentSign } from '@/api/token'

const cos = new COS({
  getAuthorization: async function (options, callback) {
		const { data } = await getTencentSign({})
    callback({
      TmpSecretId: data.secret_id,
      TmpSecretKey: data.secret_key,
      SecurityToken: data.token,
      ExpiredTime: data.expire_time
    });
  },
});
export default cos;
