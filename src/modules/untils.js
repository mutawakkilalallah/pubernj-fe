

const notifErr = (resp, next) => {
    const status = resp ? resp.status : 400
    console.log('status', status);
    if (status === 400) {
        console.log('untils',$res);
    }
}

export {
    notifErr
}