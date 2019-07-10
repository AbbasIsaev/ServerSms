const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports.setFilters = function (state, queryFilters) {
  if (state.filter && state.filter.filters.length > 0) {
    const filters = state.filter.filters;
    filters.forEach(itemOutside => {
      const listOperatorValue = [];
      itemOutside.filters.forEach(itemInside => {
        let opp = '';
        let value = '';

        switch (itemInside.operator) {
          case 'contains':
            opp = 'like';
            value = '%' + itemInside.value + '%';
            break;
          case 'doesnotcontain':
            opp = 'notLike';
            value = '%' + itemInside.value + '%';
            break;
          case 'startswith':
            opp = 'like';
            value = itemInside.value + '%';
            break;
          case 'endswith':
            opp = 'like';
            value = '%' + itemInside.value;
            break;
          case 'neq':
            opp = 'ne';
            value = itemInside.value;
            break;
          case 'isnull':
            opp = 'is';
            value = itemInside.value;
            break;
          case 'isempty':
            opp = 'eq';
            value = '';
            break;
          case 'isnotnull':
            opp = 'not';
            value = itemInside.value;
            break;
          case 'isnotempty':
            opp = 'not';
            value = '';
            break;
          default:
            opp = itemInside.operator;
            value = itemInside.value;
            break;
        }

        listOperatorValue.push({
          [op[opp]]: value
        });
      });

      if (listOperatorValue.length > 1) {
        queryFilters[itemOutside.filters[0].field] = {
          [op[itemOutside.logic]]: listOperatorValue
        };
      } else {
        queryFilters[itemOutside.filters[0].field] = listOperatorValue[0]
      }
    });
    // console.log('filters->', filters);
    // console.log('filters queryFilters->', queryFilters);
  }
};

module.exports.getSort = function (state) {
  let sort, order;
  if (state.sort && state.sort.length > 0) {
    sort = state.sort[0].field;
    order = state.sort[0].dir ? state.sort[0].dir : 'ASC';
  } else {
    sort = 'CreatedDate';
    order = 'DESC';
  }
  return {sort, order};
};

module.exports.getSkipAndTake = function (state) {
  const take = state.take ? +state.take : 50;
  const skip = state.skip ? +state.skip : state.page ? +state.page * take : 0;
  return {skip, take};
};
