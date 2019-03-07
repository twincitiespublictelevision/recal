import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import {
  getMonthHeaderTemplate,
  getMonthTemplate
} from './Utils';

const Calendar = (props) => {
	const {
		month,
		year,

		isDateHovered,
		isDateFocused,
		isDateSelected,
		isDateInRange,
		isDateHighlighted,
		isDateEnabled,

		onDateFocused,
		onDateHovered,
		onDateSelected,
		onChangeMonth,
		onChangeYear,

		calendarRef,
		createDateButtonRef,
		disabled,
		locale,

		disableKeyboard
	} = props

	// Template for month header (days of week info).
	const headerTemplate = getMonthHeaderTemplate(locale);
	// Template for month grid (days of month info).
	const monthTemplate = getMonthTemplate(month, year || 0);

	return (
		<div className="CalendarContainer">
			<CalendarHeader
				month={ month }
				year={ year }
				onBack={ onChangeMonth(-1) }
				onForward={ onChangeMonth(1) }
				onChangeYear={ onChangeYear }
				locale={ locale }
				disabled={ disabled }
				disableKeyboard={ disableKeyboard } />
			<div className="Calendar" role="grid" ref={ calendarRef }>
				<div className="head" role="row">
					{ headerTemplate.map(({ dayName, style }, i) => (
						<div key={ dayName } className="dayHeading" style={ style } role="columnheader" aria-label={ dayName }>
							<abbr>{ dayName.slice(0, 3) }</abbr>
						</div>
					)) }
				</div>
				<div className="body" role="row">
					{ monthTemplate.map(({ date, style }, i) => (
						<CalendarDay
							key={ date }
							date={ date }
							dateButtonRef={ createDateButtonRef(date) }
							dateLabel={ format(date, 'dddd, MMMM D, YYYY') }
							style={ style }
							isToday={ isToday(date) }
							isHovered={ isDateHovered(date) }
							isFocused={ isDateFocused(date) }
							isSelected={ isDateSelected(date) }
							isInRange={ isDateInRange(date) }
							isHighlighted={ isDateHighlighted(date) }
							isDisabled={ disabled || !isDateEnabled(date) }
							onSelect={ onDateSelected }
							onHover={ onDateHovered }
							onFocus={ onDateFocused }
							disableKeyboard={ disableKeyboard } />
					)) }
				</div>
			</div>
		</div>
	);
};

export default Calendar;
