import React, {useState} from 'react';
import { Text, FlatList, View, TextInput, Button } from 'react-native';

//FRONTEND VERSION
export default function Input(){ //added default
    //?don't need a state for inputRange because of <TextInput>
    const [inRangePartners, setInRangePartners] = useState([])
    let inputRange = 0
    const DescribeObject = (ob) => {
        //prints keys and values of object ob
        console.log("Running description:")
        Object.keys(ob).forEach(key =>{
            console.log(key + " => " + ob[key])
        })
    }

    // const MainListKeyExtractor = ({item, index}) => {
    //     //didn't solve the warning
    //     return item.organization + index.toString();
    // }
    

    const renderPartner = ({item}) => {
        console.log("renderPartner:")
        console.log(item)
        return(
            DisplayPartner(item)
        )
    }

    return(
        <View>
            <TextInput placeholder="Enter Range (Km)" onChange={OnChangeHandle} />
            <Button onPress={() => OnButtonClicked()} title="Display"/>
            <br/>
            <FlatList data={inRangePartners}
                // keyExtractor={MainListKeyExtractor}
                // renderItem={({item})=>{<Text>{item}</Text>}}>
                renderItem={renderPartner}>
                    
            </FlatList>
        </View>
    ); //hello

    function OnChangeHandle(inputData) {
        // setInputRange(inputData.target.value)
        inputRange = inputData.target.value
    }

    function OnButtonClicked() {
        console.log("Button was clicked")
        const url = "/api/fetchData" //* don't need to send data here (as a route inside url)
        const apiPort = 9000
        let validPartners = null
        //*<newCode>

        fetch("http://localhost:" + apiPort.toString() + url, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    inputRange: inputRange
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                res.json().then((res) => {
                        console.log(res)
                        //*res: object with keys: data (partners data) and confirmation (success or fail)

                        validPartners = res.data
                        const vpObject = JSON.parse(validPartners)

                        setInRangePartners(vpObject)
                    })
                    .catch(err => {
                        console.log("Error in receiving response from server:\n" + err)
                    })

            })
    }
   

    
    function DisplayPartner(partner){
        //displays Partner company name, location(s) and address(es)
        //partner =  {organization (companyName), branches} 
        //where branches is an array == [{location, address, coordinates}]
        //display in the following format:
        //company name
        // for each office:
        //  office#, address
        /**
         * 
         * Finally I have found it!

        The First FlatList you import from react-native

        import {FlatList} from 'react-native'
        And the second (inside-FlatList) you can import from react-native-gesture-handler

        import {FlatList as FlatList2} from 'react-native-gesture-handler'
        Then you can use the same orientation and it will work.
         */
        //TODO: Indentation
        const SingleCompany = (props) =>{
            const companyName = <Text>{props.partner.organization}</Text> //header style
            //?when logging object inside a string, output would be [object Object]
            console.log("In SG:")
            console.log("props.branches:")
            console.log(props.partner.branches)
            console.log("props.partner: " + props.partner)
            const list = <FlatList 
                data={props.partner.branches}
                renderItem={BranchRender} />
            return (
                <View>
                    {companyName}
                    {list}
                </View>
            );
        }

        const BranchRender = ({item, index}) => {
            //?hehe, turns out you are forced to call the parameter "item"!
            return(
                <View>
                    <Text>Office #{index+1}</Text>
                    <FlatList 
                    data={[item.location, item.address]} 
                    renderItem={BranchDataRender}/>
                </View>
            )
        }

        const BranchDataRender = ({item, index}) => {
            //?same issue. must called it "item" and not something else
            return <Text>{index === 0 ? "Location: " : "Address: "}{item}</Text>
        }
        
        return(//all was rapped inside a <li> -- used View instead
            <SingleCompany partner={partner} />
        );
    }
}

// return(//all was rapped inside a <li> -- used View instead
//     <View>
//         <Text >{partner.organization}</Text>{/**header */}
//         <FlatList>
//             {partner.branches.map((branch, index) => {
//                 return(//must label out-of-range office!
//                 <li>Office #{index+1}
//                 <ul>
//                     <li>Location: {branch.location}</li>
//                     <li>Address: {branch.address}</li>
//                 </ul>
//                 </li>
//                 );
//             })}
//         </FlatList>
//     </View>
// );