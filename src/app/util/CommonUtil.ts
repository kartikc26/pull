export class CommonUtil {

    getSqlInString(str: string[]) {
        //returns sql IN(--) style of any string array
        let ids = ''
        str.forEach(item => {
            ids = ids + "'" + item + "',"
        })
        ids = ids.slice(0, -1)
        return ids
    }

}