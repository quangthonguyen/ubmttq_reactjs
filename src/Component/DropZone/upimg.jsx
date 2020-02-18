import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import FeatherClient from '../../FeatherClient/FeatherConfigure';

const useStyles = makeStyles(theme => ({
  con: {
    padding: '10px'
  },
  root: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '90%'
  }
}));

function DropzoneAreaExample(props) {
  const classes = useStyles();

  const handleChange = files => {
    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener('load', () => {
        FeatherClient.service('uploads')
          .create({ uri: reader.result })
          .then(data => {
            props.handleFileChange(data.id);
          })
          .catch(error => console.log(error));
      });
    }
  };

  return (
    <DropzoneArea
      acceptedFiles={['image/*']}
      showFileNamesInPreview={true}
      dropzoneText="Kéo thả file để thay đổi ảnh đại điện."
      previewChipProps={{
        className: classes.root
      }}
      dropzoneClass={classes.con}
      onChange={handleChange.bind(this)}
      filesLimit={1}
      showAlerts={false}
    />
  );
}

export default DropzoneAreaExample;
