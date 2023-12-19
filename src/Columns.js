export const RankingColumns = [
  {
    Header: 'Most Central Nodes',
    columns: [
      {
        Header: 'Node',
        accessor: 'MostCentral.id',
      },
      {
        Header: 'Rank',
        accessor: 'MostCentral.rank',
      }
    ]
  },
  {
    Header: 'Most Connected',
    columns: [
      {
        Header: 'Node',
        accessor: 'MostConnected.id',
      },
      {
        Header: 'Total',
        accessor: 'MostConnected.neighbors',
      }
    ]
  },
  {
    Header: 'Most Events',
    columns: [
      {
        Header: 'Node',
        accessor: 'MostEvent.id',
      },
      {
        Header: 'Total',
        accessor: 'MostEvent.degrees',
      }
    ]
  },
  {
    Header: 'Hidden Influencers',
    columns: [
      {
        Header: 'Node',
        accessor: 'HiddenInfluencer.id',
      },
      {
        Header: 'Strength',
        accessor: 'HiddenInfluencer.eigenvector',
      }
    ]
  },
  {
    Header: 'Top Faciliatators',
    columns: [
      {
        Header: 'Node',
        accessor: 'TopFacilitator.id',
      },
      {
        Header: 'Strength',
        accessor: 'TopFacilitator.betweenness',
      }
    ]
  }
    
];