//urlという名前でinitialURLを受け取ってfetchまで行く
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        //Promiseオブジェクトにより、下記かコードが成功するまで待たなきゃいけない
        //データがあったら→データをresとして受け取る（JSON形式に変換して）
        fetch(url).then((res) => res.json())
        .then((data) => resolve(data));
    });
};