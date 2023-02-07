import { DATA_SERVER_IMAGE_ADDRESS } from "../../config";
import BoutCompactComponent from "../Bouts/BoutCompactComponent";
import BoutComponent from "../Bouts/BoutComponent";
import FlagComponent, { FlagPath } from "../FlagComponent";
import RequestRecordComponent from "../RequestRecordComponent";
import EntryWithItemComponent from "./EntryWithImageComponent";
import HighlightGroupComponent from "./HighlightGroupComponent";

export function EvaluateRecordIndividualEntries(recordData, definition) {
  let recordElements = [];

  let counter = 0;

  recordData.data.map(entry => {
    counter += 1;
    if (recordData.type == "person") {
      recordElements.push(
        <div className="flex">
          <p>#{counter}</p>
          {FlagComponent(entry.person.country, 50)}

          <EntryWithItemComponent
            targetLink={"/person/" + entry.person.id}
            imageUrl={DATA_SERVER_IMAGE_ADDRESS + entry.person.imageUrl}
            label1={entry.person.name}
            label2={
              entry.value + " " + ("extra" in entry ? " - " + entry.extra : "")
            }
          />
        </div>
      );
    } else if (recordData.type == "bout") {
      recordElements.push(
        <div className="flex">
          <p>#{counter}</p>
          {entry.value}

          <BoutComponent
            bout={entry.boutData}
            fighterMap={entry.boutData.fighterData}
          />
        </div>
      );
    } else if (recordData.type == "country") {
      recordElements.push(
        <div className="flex">
          <p>#{counter}</p>
          <EntryWithItemComponent
            targetLink={""}
            imageUrl={FlagPath(entry.code)}
            label1={entry.name}
            label2={entry.value}
          />
        </div>
      );
    } else if (recordData.type == "person_bout") {
      recordElements.push(
        <div className="flex">
          <p>#{counter}</p>
          <EntryWithItemComponent
            targetLink={"/person/" + entry.personData.id}
            imageUrl={DATA_SERVER_IMAGE_ADDRESS + entry.personData.imageUrl}
            label1={entry.personData.name}
            label2={entry.value + " " + definition.measuredUnit}
          />
          <BoutCompactComponent
            bout={entry.boutData}
            // fighterMap={entry.boutData.fighterData}
          />
        </div>
      );
    } else if (recordData.type == "technique") {
      recordElements.push(
        <div className="flex">
          <p>#{counter}</p>
          <EntryWithItemComponent
            targetLink={"/technique/" + entry.techniqueData.id}
            imageUrl={DATA_SERVER_IMAGE_ADDRESS + entry.techniqueData.imageUrl}
            label1={entry.techniqueData.name}
            label2={entry.value + " " + definition.measuredUnit}
          />
        </div>
      );
    }
  });

  return recordElements;
}

export function EvaluateRecordDirectoryEntries(recordData, subUrl) {
  if (recordData == null) return null;

  let groupedElements = {};

  recordData.records.map(entry => {
    return (groupedElements[entry.definition.group] = []);
  });

  let recordElements = [];
  recordData.records.map(entry => {
    let outputEntry = null;
    if (!!entry && !!entry.definition) {
      if (entry.type == "person") {
        outputEntry = (
          <EntryWithItemComponent
            targetLink={subUrl + entry.definition.url}
            imageUrl={DATA_SERVER_IMAGE_ADDRESS + entry.data[0].person.imageUrl}
            label1={entry.definition.name}
            label2={
              entry.data[0].person.name +
              " " +
              entry.data[0].value +
              " " +
              entry.definition.measuredUnit
            }
          />
        );
      } else if (entry.type == "country") {
        outputEntry = (
          <EntryWithItemComponent
            targetLink={subUrl + entry.definition.url}
            imageUrl={FlagPath(entry.data[0].code)}
            label1={entry.definition.name}
            label2={entry.data[0].value}
          />
        );
      } else if (entry.type == "bout") {
        outputEntry = (
          <EntryWithItemComponent
            targetLink={subUrl + entry.definition.url}
            imageUrl={DATA_SERVER_IMAGE_ADDRESS + "df"}
            label1={entry.definition.name}
            label2={entry.data[0].value}
          />
        );
      } else if (entry.type == "person_bout") {
        outputEntry = (
          <EntryWithItemComponent
            targetLink={subUrl + entry.definition.url}
            imageUrl={
              DATA_SERVER_IMAGE_ADDRESS + entry.data[0].personData.imageUrl
            }
            label1={entry.definition.name}
            label2={
              entry.data[0].personData.name +
              " " +
              entry.data[0].value +
              " " +
              entry.definition.measuredUnit
            }
          />
        );
      } else if (entry.type == "technique") {
        outputEntry = (
          <EntryWithItemComponent
            targetLink={subUrl + entry.definition.url}
            imageUrl={
              DATA_SERVER_IMAGE_ADDRESS + entry.data[0].techniqueData.imageUrl
            }
            label1={entry.definition.name}
            label2={
              entry.data[0].techniqueData.name +
              " " +
              entry.data[0].value +
              " " +
              entry.definition.measuredUnit
            }
          />
        );
      }

      recordElements.push(outputEntry);
    }
  });

  recordElements.push(<RequestRecordComponent />);

  return recordElements;
}

export function RenderHighlights(recordData, isActivity = false) {
  let groupElements = null;
  if (recordData) {
    groupElements = recordData.map(container => {
      let isActivity = "imageUrl" in container == false;

      return (
        <HighlightGroupComponent
          key={container.name}
          defaultSelected={isActivity ? null : container.defaultselected}
          // fightRecord={isActivity ? null : container.fightrecord}
          gro
          imageUrl={isActivity ? null : container.imageUrl}
          title={container.name.toUpperCase()}
          divisionData={isActivity ? null : container.divisions}
          activityData={isActivity ? container : null}
        />
      );
    });
  }

  return <div className="space-y-5">{groupElements}</div>;
}
