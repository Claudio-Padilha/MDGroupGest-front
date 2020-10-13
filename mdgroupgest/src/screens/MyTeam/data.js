import func1 from '../../assets/icons/func1.png';
import func2 from '../../assets/icons/func2.png';
import func3 from '../../assets/icons/func3.png';
import func4 from '../../assets/icons/func4.png';
import func5 from '../../assets/icons/func5.png';
import func6 from '../../assets/icons/func6.png';
import func8 from '../../assets/icons/func8.png';
import func9 from '../../assets/icons/func9.png';
import func10 from '../../assets/icons/func10.png';
import func11 from '../../assets/icons/func11.png';

export default {
  name: 'ESCRITÓRIO LUCAS PADILHA',
  textProps: {x: -30, y: 25},
  children: [
    {
      name: 'Marcílio (TEAM LEADER)',
      photo: func9,
      textProps: {x: -30, y: 25},
      children: [
        {
          name: 'Joaquim (INSTRUTOR)',
          photo: func8,
          textProps: {x: -30, y: 25},
          children: []
        }, 
        {
          name: 'Pedra (INSTRUTOR)',
          photo: func3,
          textProps: {x: -30, y: 25},
          children: [
            {
              name: 'Jorgista (COMERCIAL)',
              photo: func1,
              textProps: {x: -30, y: 25},
              children: []
            },
            {
              name: 'Roberta (COMERCIAL)',
              photo: func4,
              textProps: {x: -30, y: 25},
              children: []
            },
          ]
        },
        {
          name: 'Josué (INSTRUTOR)',
          photo: func5,
          textProps: {x: -30, y: 25},
          children: [
            {
              name: 'Monique (COMERCIAL)',
              photo: func2,
              textProps: {x: -30, y: 25},
              children: []
            },
            {
              name: 'Jubileu (COMERCIAL)',
              photo: func6,
              textProps: {x: -30, y: 25},
              children: []
            },
            {
              name: 'Tércio (COMERCIAL)',
              photo: func5,
              textProps: {x: -30, y: 25},
              children: []
            }
          ]
        }, 
      ]
    }, 
    {
      name: 'Justino (TEAM LEADER)',
      photo: func8,
      textProps: {x: -30, y: 25},
      children: [
        {
          name: 'Terezinha (INSTRUTOR)',
          photo: func2,
          textProps: {x: -30, y: 25},
          children: [
            {
              name: 'Ronei (COMERCIAL)',
              photo: func6,
              textProps: {x: -30, y: 25},
              children: []
            },
            {
              name: 'Peter (COMERCIAL)',
              photo: func5,
              textProps: {x: -30, y: 25},
              children: []
            }
          ]
        },
        {
          name: 'Gonzalez (INSTRUTOR)',
          photo: func6,
          textProps: {x: -30, y: 25},
          children: [
            {
              name: 'Gilson (COMERCIAL)',
              photo: func1,
              textProps: {x: -30, y: 25},
              children: []
            }
          ]
        }
      ]
    },
  ]
}
