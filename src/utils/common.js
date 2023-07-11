import store from '@/store'
const $IPFS_URL= process.env.VUE_IPFS_URL
const $IMGURL= process.env.VUE_APP_IMGURL
export default{

	covers(cover) {
        let reg=/^\group[0-9]+/g
        let arr=cover.split("/")
        // console.log(reg.test(arr[1]))
              if(arr[0]=="http:"||arr[0]=="https:"){
                  return cover
              }else if(reg.test(arr[1])){
                    if (cover.indexOf("thumb.jpg") != -1) {
                        return $IPFS_URL+'/ipfs/'+cover;
                        } else {
                            let baseURl=localStorage.getItem('setConfig')
                            console.log(baseURl+cover,66)
                            return  baseURl+cover;
                    }
              }else if(arr[1]=="upload"){
          return $IMGURL+cover;
        }
  
  
      },
}