import React from 'react';
import {
    View,
    Flex,
    Image, 
    Heading,
    Text,
    Link
} from '@adobe/react-spectrum';
import { useNavigate } from 'react-router-dom';

export interface ActionCardProps {
    title: string,
    description: string,
    coverUrl: string,
    href: string
}


const ActionCard = ({title, description, href, coverUrl}: ActionCardProps) => {

    const navigate = useNavigate();



    return (
        <Link href='#' onPress={()=> navigate(href)} UNSAFE_className='silent-link-small'>
            <View borderRadius={'medium'} overflow={'hidden'} width={'350px'}  borderWidth={'thin'} borderColor={'gray-200'} >
                <Flex direction={'column'}>
                    <Image src={coverUrl} height={'220px'} alt='Use case card image'/>
                    <View padding={'size-150'} height={'size-1250'} backgroundColor={'static-white'}>
                        <Flex direction={'column'} gap={'size-100'}>
                            <Heading>{title}</Heading>
                            <Text>{description}</Text>
                        </Flex>
                    </View>
                
                </Flex>
            </View>
        </Link>
    );
}

export default ActionCard