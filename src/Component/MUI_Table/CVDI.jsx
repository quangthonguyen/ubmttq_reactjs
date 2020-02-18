import MUIDataTable from 'mui-datatables';
import React from 'react';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import DeleteCVDIDialog from '../Dialogs/DeleteCVDI';
import EditCVDIDialog from '../Dialogs/EditCVDI';
import DetailCVDIDialog from '../Dialogs/DetailCVDI';

const formatDate = str => {
  const time = new Date(str);
  return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};

function CVD() {
  //useSelector
  const listCVDI = useShallowEqualSelector(state => state.listCVDI);
  const listUsers = useShallowEqualSelector(state => state.listUsers);
  const listCVDI2 = [...listCVDI];

  return (
    <>
      <MUIDataTable
        title={'Công văn đi'}
        data={listCVDI2.reverse()}
        columns={[
          {
            name: 'STT',
            label: 'STT',
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  listCVDI2.findIndex(e => e['_id'] === tableMeta.rowData[1]) +
                  1
                ).toString();
              }
            }
          },
          {
            name: '_id',
            label: 'id',
            options: {
              filter: false,
              sort: false,
              display: false,
              viewColumns: false
            }
          },
          {
            name: 'soVb',
            label: 'Số VB',
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: 'loaiVb',
            label: 'loại Vb',
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: 'donViGui',
            label: 'Đơn vị gửi',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField'
            }
          },
          {
            name: 'ngayDi',
            label: 'Ngày Đi',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
              customBodyRender: (value, tableMeta, updateValue) => {
                return formatDate(tableMeta.rowData[5]);
              }
            }
          },

          {
            name: 'nguoiThucHien',
            label: 'Người thực hiện',
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                for (let index = 0; index < listUsers.length; index++) {
                  if (listUsers[index]['_id'] === tableMeta.rowData[6]) {
                    return (
                      listUsers[index].lastName +
                      ' ' +
                      listUsers[index].fristName
                    );
                  }
                }
              }
            }
          },
          {
            name: 'thoiHan',
            label: 'Thời hạn',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
              customBodyRender: (value, tableMeta, updateValue) => {
                return tableMeta.rowData[7]
                  ? formatDate(tableMeta.rowData[7])
                  : '';
              }
            }
          },
          {
            name: 'noiDungVb',
            label: 'Nội Dung VB',
            options: {
              filter: true,
              sort: true,
              display: false,
              filterType: 'textField'
            }
          },
          {
            name: 'fileName',
            label: 'File ',
            options: {
              filter: true,
              sort: true,
              display: false,
              filterType: 'textField'
            }
          },
          {
            name: 'fileId',
            label: 'File ID ',
            options: {
              filter: false,
              sort: false,
              display: false,
              viewColumns: false
            }
          },

          {
            name: '',
            options: {
              filter: false,
              sort: false,
              empty: true,
              viewColumns: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <>
                    <div style={{ display: 'flex' }}>
                      <DetailCVDIDialog detailCVDI={tableMeta.rowData} />
                      <EditCVDIDialog EditCVDI={tableMeta.rowData} />
                      <DeleteCVDIDialog DeleteCVDI={tableMeta.rowData} />
                    </div>
                  </>
                );
              }
            }
          }
        ]}
        options={{
          filterType: 'multiselect',
          selectableRows: 'none',
          print: false,
          download: false,
          responsive: 'scrollMaxHeight'
        }}
      />
    </>
  );
}

export default CVD;
