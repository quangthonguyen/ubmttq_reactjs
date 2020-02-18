import MUIDataTable from 'mui-datatables';
import React from 'react';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import EditDanhMuc from '../Dialogs/EditDanhMuc';

function CVD(props) {
  //useSelector
  //   const listCVD = useShallowEqualSelector(state => state.listCVD);
  const listUsers = useShallowEqualSelector(state => state.listUsers);
  const listUsers2 = [...listUsers];

  return (
    <>
      <MUIDataTable
        title={'Danh mục người dùng'}
        data={listUsers2.reverse()}
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
                  listUsers2.findIndex(e => e['_id'] === tableMeta.rowData[1]) +
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
            name: '',
            label: 'Họ và tên',
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return tableMeta.rowData[3] + ' ' + tableMeta.rowData[4];
              }
            }
          },
          {
            name: 'lastName',
            label: 'Họ',
            options: {
              filter: true,
              sort: true,
              display: false
            }
          },
          {
            name: 'fristName',
            label: 'Tên',
            options: {
              filter: true,
              sort: true,
              display: false
            }
          },
          {
            name: 'chucVu',
            label: 'Chức vụ',
            options: {
              filter: true,
              sort: true,
              display: true
            }
          },
          {
            name: 'email',
            label: 'Email',
            options: {
              filter: true,
              sort: true,
              display: true
            }
          },
          {
            name: 'qlCVD',
            options: {
              filter: false,
              sort: false,
              display: false,
              viewColumns: false
            }
          },
          {
            name: 'qlCVDI',
            options: {
              filter: false,
              sort: false,
              display: false,
              viewColumns: false
            }
          },
          {
            name: 'qlDM',
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
                      <EditDanhMuc EditCVD={tableMeta.rowData} />
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
