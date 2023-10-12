// readfile json
const fs = require('fs');
const path = require('path');

// file json
const fileNames = [
    'dashboard_get_location_ap.json',
    'dashboard_get_location_ipphone.json',
    'dashboard_get_location_offline.json',
    'dashboard_get_location_online.json',
    'dashboard_get_location_onu.json',
    'dashboard_get_location_private.json',
    'dashboard_get_location_router.json'
];

// สร้าง ตัวแปรรับ data 
const mergedData = {
    status: 'success',
    datas_t: {},
    datas_s: {}
};

try {
    // loop filename 
    for (const fileName of fileNames) {
        //read file json
        const filePath = path.join(__dirname, fileName);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Merge datas_t
        // in data คือข้อมูลที่ได้จาก json
        // รวมข้อมูลที่มีอยู่
        // เพิ่มข้อมูลใหม่
        for (const key in data.datas_t) {
            if (!mergedData.datas_t[key]) {
                mergedData.datas_t[key] = {};
            }
            mergedData.datas_t[key] = { ...mergedData.datas_t[key], ...data.datas_t[key] };
        }

        // Merge datas_s
        // in data คือข้อมูลที่ได้จาก json
        // รวมข้อมูลที่มีอยู่
        // เพิ่มข้อมูลใหม่
        for (const key in data.datas_s) {
            if (!mergedData.datas_s[key]) {
                mergedData.datas_s[key] = {};
            }
            mergedData.datas_s[key] = { ...mergedData.datas_s[key], ...data.datas_s[key] };
        }
    }

    console.log('Merged Data:', JSON.stringify(mergedData, null, 2));
} catch (err) {
    console.error('Error reading or merging JSON:', err);
}
