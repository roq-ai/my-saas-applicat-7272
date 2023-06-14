import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner'];
  const applicationName = 'My SaaS application';
  const tenantName = 'organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Business Owner creates an organization

As a Business Owner,
I want to create an organization,
So that I can manage my company's information and connect with farmers.

---

Title: Business Owner invites team members

As a Business Owner,
I want to invite team members to join the organization,
So that they can help manage the company's information and connections with farmers.

---

Title: Business Owner updates organization information

As a Business Owner,
I want to update my organization's information,
So that it remains accurate and up-to-date.

---

Title: Business Owner searches for farmers

As a Business Owner,
I want to search for farmers,
So that I can find potential partners for my company.

---

Title: Business Owner sends connection request to farmers

As a Business Owner,
I want to send connection requests to farmers,
So that I can establish a partnership with them.

---

Title: Business Owner accepts or declines connection requests from farmers

As a Business Owner,
I want to accept or decline connection requests from farmers,
So that I can control which farmers my company partners with.

---

Title: Farmer creates a profile

As a Farmer,
I want to create a profile,
So that I can showcase my farm and products to potential partners.

---

Title: Farmer updates profile information

As a Farmer,
I want to update my profile information,
So that it remains accurate and up-to-date.

---

Title: Farmer searches for big companies

As a Farmer,
I want to search for big companies,
So that I can find potential partners for my farm.

---

Title: Farmer sends connection request to big companies

As a Farmer,
I want to send connection requests to big companies,
So that I can establish a partnership with them.

---

Title: Farmer accepts or declines connection requests from big companies

As a Farmer,
I want to accept or decline connection requests from big companies,
So that I can control which companies I partner with.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
