
import BasicTable from "./BasicTable";
import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'
 
function GraphData({nodes, links, rankings}) {

    console.log(nodes)
    console.log(links)
    console.log(rankings)
     
  return (
    <Tabs>
        <TabList>
            <Tab>Rankings</Tab>
            <Tab>Nodes</Tab>
            <Tab>Links</Tab>
        </TabList>
        <TabPanel>
            <BasicTable tableData={rankings} type="rankings"></BasicTable>
        </TabPanel>
        <TabPanel>
            <BasicTable tableData={nodes} type="nodes"></BasicTable>
        </TabPanel>
        <TabPanel>
            <BasicTable tableData={links} type="links"></BasicTable>
        </TabPanel>
    </Tabs>      
  )
}
 
export default GraphData