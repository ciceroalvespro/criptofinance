import React from 'react';
import styled from 'styled-components';

interface ServiceCardProps {
  title: string;
  description: string;
}

const Card = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 1rem;
  flex: 1;
  min-width: 300px;
  max-width: 350px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default ServiceCard; 