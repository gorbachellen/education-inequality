# Group AC2: Disparity of Education Opportunities

Geography 458: Advanced Digital Geographies

1. Anush Mughnetsyan
2. Ellen Gorbach
3. Joshua Zhang
4. Julianne Corpuz
5. Megan James Plunkett

## Ideas, significances, and broader impacts:

<p align="center">
  <img src="img/book.jpg" width="300">
</p>

Through our final project, we hope to map the disparities between education opportunities within the United States. Inspired by author, Jonathan Kozol’s work Savage Inequalities: Children in America's Schools, we understand that there are differences in fundings for neighborhoods with residents with higher income versus residents with lower income. This contrast led to a huge gap in the quality of education in public schools. The essential resources such as infrastructures, good teachers, or living environments were not equally shared among these public schools when they should have been as they are key factors necessary to equip a child with knowledge and quality assistance. Our team’s goal is to produce a timeline of the average funding each student from each state received from 1993 to 2016 to show how situations were improved or worsened with spatial patterns. Also, we will also show the average reading and mathematical scores of each state along with race and population factors within each period of time.

Demonstrating how living in one location in one’s childhood will impact his or her entire life due to the financial status or the funding from local government to the public school system is the vital factor that highlights the significance of our project. However, our project is not intended to point fingers and create a person or entity to blame. Rather, we want to show the milestones of improvements in each area with our map and give potential advice on the reallocation of public school resources from the federal government.

## Targeted Audiences:

Our target audiences are parents from each state. Consequently, we have decided to forgo jargon and instead use language that is easy to understand such as the average expenditure on the public school systems for each enrolled student and the childrens’ academic achievement in the exams. The key takeaway we want our audience to have is motivation to speak up for their child because every child in the primary stage of their academic life deserves equal opportunities.

## Primary Datasets and required functions:

1. [U.S. Education Datasets: Unification Project](https://www.kaggle.com/datasets/noriuk/us-education-datasets-unification-project) is a combination of datasets of each state’s total revenue, expenditure, enrolled K-12 students, and students’ academic achievements. The data resources are all from the U.S. Census Bureau and the National Center for Education Statistics (NCES). We plan to make 2 thematic layers on these datasets which we will cover in the project format section of the proposal.  Because we want to show the educational investment in each state as independent variables and academic achievement as the dependent variables, we will allow the users to see details in each layer and compare their places of interest by themselves. There will be separate map layers for years between 1993 and 2016. In addition, we have to connect the dataset to a shapefile in order to make it a map.

2. Another dataset that our team will use is [NCES School Locations Dataset 2020-2021](https://nces.ed.gov/programs/edge/geographic/schoollocations). This dataset is from the National Center for Education Statistics and it provides the location and name of every public school across all counties between 2020 and 2021. We plan to use the King county portion of the dataset to create a dot density map to make a distinction of where we are all currently residing and where the project was created. The reason why we are only providing a dot density for King County is to ensure that our audience is not being overloaded with information at once and to also preserve and promote intelligibility and prevent our audience from getting distracted with too many points. This dataset intends to show the general patterns of spatial distribution of public schools in King county and it functions as a hook of the project.

3. The other minor datasets that we will be using include the U.S. Census Population Counts, [King County and its Cities](https://data.kingcounty.gov/Demographics/2010-U-S-Census-Population-Counts-King-County-and-/cavj-x985) and the [State Population Totals: 2010-2019](https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html) to optimize the other datasets mentioned above. Additionally, we will also use the [Cartographic Boundary Files - Shapefile](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html) for our shapefiles.

## Multimedia:
* [Education Statistics: Facts About American Schools](https://www.edweek.org/leadership/education-statistics-facts-about-american-schools/2019/01)

* [Jonathan Kozol - Savage Inequalities](https://www.youtube.com/watch?v=f6wCsAXmjdI)
We plan to add more news articles and statistic data for multimedia

## Project format:

We will be making a generic digital geographies project because we want the audience to explore areas in the area their family members live after we introduce our ideas. The projection of the map will be Albers equal area conic projection to show the lower states. We want to use a light monochrome basemap to show the best visual contrast. We will use zoom 4 for initial overview and -100, 38 for long and lat. So far, we plan to make two major choropleth maps and a dot density map.

### Choropleth Maps(Using NCES education dataset and USA population dataset):

Map 1 explores income and investment in public high schools through a collection of choropleth maps dated 2005 to 2015. Each map’s data is filtered by the categories of “Money on Students”, “Enrollment”, “Instruction Expenditure”, and “Federal Revenue”. By displaying the progress (or lack thereof) of schools over time, we begin to paint a picture of how school is valued through the lens of money. How much is spent? Where? This leads us to Map 2, where we delve into academic performance by state.

Map 2 tells the story of scores. Data is presented as a collection of choropleth maps dated 2005-2015, broken down by “Verbal SAT”, “Math SAT”, “Art GPA”, and “STEM GPA”. Paired now with Map 1, we can build a greater understanding of potential association between money and performance. Questions we could ask ourselves are: Where are the best scores? Where are the worst?

### Dot Density Map (Using NCES School Locations Dataset and King county average income dataset):

This map will use the location of each public school in King county to show a distribution of public schools. In fact, we want to use census tract average income data to be a choropleth basemap for the dots of schools. The goal of this map is to show the unequal distribution of public school resources to hook the audience's interest.

## Defining Terms

**Map 1:**
<p> “Money on Students”: Spending on student instruction fees (per student), measured in dollars <br>
“Enrollment”: Total number of students enrolled in public school (in thousands of students)<br>
“Instruction Expenditure”: Total expenditure (in millions of dollars) for all students spent on instruction fees <br>
“Federal Revenue”: Total amount allocated to public schools, measures in thousands of dollars </p>

**Map 2:**
<p> “Verbal SAT”: Percentage of students who received a 200-500 on the Critical Reading portion of the SAT. The range 200-500 was selected, as scores in a lower range are less likely to be impacted by private tutoring and other resources. <br>
“Math SAT”: Percentage of students who received a 200-500 on the Math portion of the SAT. The range 200-500 was selected, as scores in a lower range are less likely to be impacted by private tutoring and other resources. <br>
“Art GPA”: Average GPAs, consisting of Arts/Music GPA, English GPA, Foreign Languages GPA, and Social Sciences GPA <br>
“STEM GPA”: Average GPAs, consisting of Mathematics GPA and Natural Sciences GPA </p>

## Recognition of Potential Biases
We recognize the inherent biases of SAT scores as a reflection of education level. Students of a lower family income level tend to score lowest, whereas students of a higher family income level have much higher average scores. Disadvantage can mostly be attributed to test preparation, but may also have something to do with “stereotype threat”, where “reminding students of their racial group before taking a test can impact their score” (Elsesser, 2019). Additionally, at this point in time, points were deducted for incorrect answers. With this in mind, students took different approaches than others when it came to the exam that could affect performance. Therefore, while our data is sound, SAT scores themselves are not always reflective of a population and how they otherwise perform academically. 

## Credits:

This github repository is a work based on guidelines from Geog 458 Advanced Digital Geographies created by Professor Bo Zhao from University of Washington.
