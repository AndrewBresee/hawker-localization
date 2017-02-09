import config from  '~/config.json';
import ContentfulManagement from 'contentful-management';
import spaceExport from 'contentful-export';
import spaceImport from 'contentful-import';


let cloneToNewSpace = () => {
  const client = ContentfulManagement.createClient({
    accessToken: config.uploadToContentfulManagementToken
  })

  let options = {
    spaceId: config.cloneFromContentfulSpace,
    managementToken: config.uploadToContentfulManagementToken,
  }

  spaceExport(options)
  .then((output) => {
    client.createSpace({name: "New Test Space"})
    .then((createdSpace) => {
      console.log(' createdSpace: ', createdSpace);
      let uploadOptions = {
        content: output,
        spaceId: createdSpace.sys.id,
        managementToken: config.uploadToContentfulManagementToken
      }
      spaceImport(uploadOptions)
      .then((finalOutput) => {
        console.log('Data Imported successfully')
      })
      .catch((err) => {
        console.log('Error in uploading the space: ', err)
      })
    })
    .catch((err) => {
      console.log(' Error in creating a new space:', err)
    })
  })
  .catch((err) => {
    console.log(' Error in downloading the space: ', err);
  })

}

cloneToNewSpace();
