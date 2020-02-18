import MUIDataTable from 'mui-datatables';
import React from 'react';
import useShallowEqualSelector from '../../Redux/useShallowEqualSelector';
import DeleteCVDDialog from '../Dialogs/DeleteCVD';
import EditCVDDialog from '../Dialogs/EditCVD';
import DetailCVDDialog from '../Dialogs/DetailCVD';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const formatDate = str => {
  const time = new Date(str);
  return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};

const customStyles = {
  BusinessAnalystRow: {
    '& td': { backgroundColor: '#EEE' }
  }
};

function CVD(props) {
  //useSelector
  const listCVD = useShallowEqualSelector(state => state.listCVD);
  const listUsers = useShallowEqualSelector(state => state.listUsers);
  const listCVD2 = [...listCVD];
  //use Dispatch
  const dispatch = useDispatch();
  return (
    <>
      <MUIDataTable
        title={'Công văn đến'}
        data={listCVD2.reverse()}
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
                  listCVD2.findIndex(e => e['_id'] === tableMeta.rowData[1]) + 1
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
            name: 'ngayDen',
            label: 'Ngày Đến',
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
            name: 'noiDungLd',
            label: 'Nội Dung LD',
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
            name: 'trangThai',
            label: 'Trạng thái',
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Box
                    fontStyle="italic"
                    fontWeight={
                      tableMeta.rowData[12] === 'Đã gửi'
                        ? 'fontWeightLight'
                        : 'fontWeightBold'
                    }
                    textAlign="center"
                    color={
                      (tableMeta.rowData[12] === 'Đã nhận' && 'info.main') ||
                      (tableMeta.rowData[12] === 'Hoàn thành' &&
                        'success.main') ||
                      (tableMeta.rowData[12] === 'Gần hết hạn' &&
                        'error.main') ||
                      (tableMeta.rowData[12] === 'Hết hạn' && 'error.main') ||
                      (tableMeta.rowData[12] === 'Đã gửi' && 'text.disabled')
                    }
                  >
                    {tableMeta.rowData[12]}
                  </Box>
                );
              }
            }
          },
          {
            name: 'notification',
            label: 'notification',
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
                      <DetailCVDDialog detailCVD={tableMeta.rowData} />
                      <EditCVDDialog EditCVD={tableMeta.rowData} />
                      <DeleteCVDDialog DeleteCVD={tableMeta.rowData} />
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
          responsive: 'scrollMaxHeight',
          setRowProps: row => {
            return {
              className: classnames({
                [props.classes.BusinessAnalystRow]: row[13] === true
              })
            };
          },
          onRowClick: (rowData, rowMeta) => {
            rowData[13] &&
              dispatch({
                type: 'UPDATE_NOTIFICATION_CVD',
                payload: {
                  id: rowData[1],
                  updateField: { notification: false }
                }
              });
          }
        }}
      />
    </>
  );
}

export default withStyles(customStyles)(CVD);
