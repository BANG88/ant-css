#!/bin/bash

COMPONENTS=("button" "date-picker" "input" "notification" "skeleton" "time-picker" "calendar" "descriptions" "input-number" "page-header" "slider" "timeline" "affix" "card" "divider" "layout" "pagination" "spin" "tooltip" "alert" "carousel" "drawer" "list" "statistic" "transfer" "anchor" "cascader" "dropdown" "popover" "steps" "tree" "auto-complete" "checkbox" "empty" "mention" "progress" "tree-select" "avatar" "form" "mentions" "radio" "switch" "typography" "back-top" "collapse" "grid" "menu" "rate" "table" "upload" "badge" "comment" "icon" "message" "tabs" "breadcrumb" "modal" "select" "tag" )

for c in "${COMPONENTS[@]}" ; do
echo ${c}
./node_modules/.bin/lessc --js ant-design/components/${c}/style/index.less ./dist/${c}/style.css
done
./node_modules/.bin/lessc --js ant-design/components/style/index.less ./dist/style/style.css

