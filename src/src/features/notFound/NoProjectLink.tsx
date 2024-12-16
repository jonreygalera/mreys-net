import React from 'react';
import Box from '../../components/box/Box';
import IProject from '../../interface/IProject';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';

interface Props {
  data?: IProject | null;
}

const NoProjectLink: React.FC<Props> = (props) => {

  const { data } = props;

  return (
    <Box className="max-w-lg w-full rounded-lg p-8 items-center">
      <Box className="text-center">
        <Typography variant='h1' className="text-red-500">Oops!</Typography>
        {
          (!data?.url && data?.fallbackUrl) && (
            <Typography className="mt-4 text-xl text-primary-700">
              Sorry, we cannot visit the website.
            </Typography>
          )
        }

        {
          data?.fallbackUrl && (
            <Box>
              <Typography className="mt-2 text-lg text-primary-600">
                Visit the company website: 
                <a href={data?.fallbackUrl ?? '#'} target='_blank' className="text-blue-500 underline ml-2">
                  {data?.title}
                </a>
              </Typography>
              <Box className="mt-6">
                <Button
                  onClick={() =>( window.open(data?.fallbackUrl ?? '#', '_blank'))}
                  className="px-6 py-3 bg-blue-500 text-primary-100 border-2 border-primary-950 rounded-lg hover:bg-blue-700 transition duration-300 shadow-solid"
                >
                  Visit {data?.title}
                </Button>
              </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}

export default React.memo(NoProjectLink);
