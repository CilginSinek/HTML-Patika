const posts = [
    {sahip:"name1", baslik:"anan1", aciklama:"hebelehubelel"},
    {sahip:"name2", baslik:"anan3", aciklama:"hebelehubelel"},
    {sahip:"name3", baslik:"anan2", aciklama:"hebelehubelel"},
    {sahip:"name4", baslik:"anan4", aciklama:"hebelehubelel"}
]

const addpost = (sahip, baslik, post) =>{
    const promise1 = new Promise((resolve, reject) => {
        if(sahip){
            if(baslik){
                if(post){
                    console.log("Verileriniz alınıyor...")
                    posts.push({
                        sahip: `${sahip}`,
                        baslik: `${baslik}`,
                        aciklama: `${post}`
                    });
                    resolve(showBooks(),"Verileriniz yüklenmiştir.")
                } else{
                    reject("Aciklama girmeniz gerek")
                };
            } else{
                reject("Baslik girmeden post atamazsınız!")
            };
        } else{
            reject("Post atabilmeniz için giriş yapmanız gerekmektedir!")
        };
    });
};

const listPosts = () => {
    return new Promise((resolve, reject) => {
        if(posts){
            posts.forEach((post)=>{
                console.log(post.sahip,"|",post.baslik,"|",post.aciklama);
            });
            resolve(posts);
        } else{
            reject("post yok");
        };
    });
};

function showBooks() {
    try {
        listPosts();
    } catch (error) {
        console.log(error);
    }
};
addpost("esin","muz yiyorum","muz sütünden sıkıldım muz yiyorum nefis :p")

